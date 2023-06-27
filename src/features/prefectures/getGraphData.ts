import { Prefecture, Point, StatType, GraphData } from "./types";

const getGraphData = (prefList: Prefecture[], prefStatType: StatType) => {
  const prefsWithPopulation = prefList.filter((p) => p.composition);
  const graphData: GraphData[] =
    prefsWithPopulation[0]?.composition?.[prefStatType]?.map(
      (point: Point) => ({
        year: point.year,
      })
    ) || [];
  prefsWithPopulation.forEach((p: Prefecture, i) => {
    graphData[i].stroke = p.stroke || "";
    if (p.composition) {
      const composition: Point[] = p.composition[prefStatType];
      composition.forEach((point: Point, j) => {
        graphData[j][p.prefName] = point.value;
      });
    }
  });

  return graphData;
};

export default getGraphData;
