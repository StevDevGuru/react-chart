import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Spin } from "../../components/Spin";
import RadioButton from "../../components/RadioButton";
import CheckBox from "../../components/Checkbox";
import strokeColors from "./strokeColors";
import {
  Prefecture,
  StatType,
  PopulationComposition,
  Populations,
} from "./types";
import getGraphData from "./getGraphData";
import { Col, Row } from "../../components/Layout";
import useStyles from "./style";

const PREFECTURES_API = "prefectures";
const POPULATION_COMPOSITION_API = "population/composition/perYear";
const populationTypes = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

const Prefectures = () => {
  const [prefList, setPrefList] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [prefStatType, setPrefStatType] = useState<StatType>("総人口");

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prefectureRes, populationRes] = await Promise.all([
          axios.get(PREFECTURES_API),
          axios.get(`${POPULATION_COMPOSITION_API}?prefCode=1&cityCode=-`),
        ]);

        const prefectures = prefectureRes.data.result;
        const populationComposition = populationRes.data.result.data;

        const updatedPrefList = prefectures.map(
          (prefecture: Prefecture, index: number) => {
            const composition = populationComposition.reduce(
              (acc: Populations, item: PopulationComposition) => {
                acc[item?.label] = item.data;
                return acc;
              },
              {}
            );

            return {
              ...prefecture,
              selected: false,
              composition: null,
              stroke: strokeColors[index],
            };
          }
        );

        setPrefList(updatedPrefList);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPopulationComposition = async (prefCode: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${POPULATION_COMPOSITION_API}?prefCode=${prefCode}&cityCode=-`
      );
      const composition = res?.data?.result?.data.reduce(
        (acc: Populations, item: PopulationComposition) => {
          acc[item?.label] = item.data;
          return acc;
        },
        {}
      );
      setPrefList((prevPrefList: Prefecture[]) =>
        prevPrefList.map((p) =>
          p.prefCode === prefCode
            ? {
                ...p,
                selected: true,
                composition,
                stroke: strokeColors[prefCode - 1],
              }
            : p
        )
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onSelectPref = (selected: boolean, prefecture: Prefecture) => {
    if (selected) {
      fetchPopulationComposition(prefecture.prefCode);
    } else {
      setPrefList((prevPrefList) =>
        prevPrefList.map((p) =>
          p.prefCode === prefecture.prefCode
            ? { ...p, selected: false, composition: null, stroke: undefined }
            : p
        )
      );
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefStatType(e.target.value as StatType);
  };

  const graphData = getGraphData(prefList, prefStatType);

  return (
    <Spin spinning={loading}>
      <h1>Population Chart</h1>
      <Row>
        {populationTypes.map((item) => (
          <Col span={2} sm={6} key={item}>
            <RadioButton
              label={item}
              value={item}
              checked={prefStatType === item}
              onChange={handleRadioChange}
              key={item}
            />
          </Col>
        ))}
      </Row>
      <div className={classes.graphWrapper}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            {Object.keys(graphData?.[0] || {})
              .filter((k: string) => k !== "year" && k !== "stroke")
              .map((key, index) => (
                <Line
                  type="monotone"
                  dataKey={key}
                  key={key}
                  stroke={String(graphData?.[index]?.stroke)}
                />
              ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Row>
        {prefList.map((pref: Prefecture) => (
          <Col span={1} sm={4} key={pref.prefCode}>
            <CheckBox
              color={pref.stroke}
              label={pref.prefName}
              checked={pref.selected}
              onChange={(checked) => onSelectPref(checked, pref)}
            />
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default Prefectures;
