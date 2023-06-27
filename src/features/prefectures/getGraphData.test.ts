import { Prefecture, StatType } from "./types";
import getGraphData from "./getGraphData";

describe("getGraphData", () => {
  it("returns an empty array when no prefectures are provided", () => {
    const prefList: Prefecture[] = [];
    const prefStatType = "総人口" as StatType;

    const result = getGraphData(prefList, prefStatType);

    expect(result).toEqual([]);
  });

  it("properly maps and filters the provided prefecture data", () => {
    const prefList: Prefecture[] = [
      {
        prefCode: 1,
        prefName: "Hokkaido",
        selected: true,
        stroke: "#123456",
        composition: {
          総人口: [
            { year: 2022, value: 5000 },
            { year: 2023, value: 5200 },
          ],
          年少人口: [
            { year: 2022, value: 5000 },
            { year: 2023, value: 5200 },
          ],
          生産年齢人口: [
            { year: 2022, value: 5000 },
            { year: 2023, value: 5200 },
          ],
          老年人口: [
            { year: 2022, value: 5000 },
            { year: 2023, value: 5200 },
          ],
        },
      },
      {
        prefCode: 2,
        prefName: "Aomori",
        selected: false,
        stroke: "#654321",
        composition: null,
      },
    ];
    const prefStatType = "総人口";

    const result = getGraphData(prefList, prefStatType);

    const expected = [
      { year: 2022, stroke: "#123456", Hokkaido: 5000 },
      { year: 2023, Hokkaido: 5200 },
    ];

    expect(result).toEqual(expected);
  });
});
