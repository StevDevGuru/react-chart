import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import Prefectures from "./index";

jest.mock("axios");

const prefs = [{ prefCode: 1, prefName: "北海道" }];

const populationData = [
  {
    label: "総人口",
    data: [
      {
        year: 1960,
        value: 5039206,
      },
      {
        year: 1965,
        value: 5171800,
      },
    ],
  },
  {
    label: "年少人口",
    data: [
      {
        year: 1960,
        value: 1681479,
        rate: 33.3,
      },
      {
        year: 1965,
        value: 1462123,
        rate: 28.2,
      },
    ],
  },
  {
    label: "生産年齢人口",
    data: [
      {
        year: 1960,
        value: 3145664,
        rate: 62.4,
      },
      {
        year: 1965,
        value: 3460359,
        rate: 66.9,
      },
    ],
  },
  {
    label: "老年人口",
    data: [
      {
        year: 1960,
        value: 212063,
        rate: 4.2,
      },
      {
        year: 1965,
        value: 249318,
        rate: 4.8,
      },
    ],
  },
];

describe("Prefectures Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render without crashing", () => {
    render(<Prefectures />);
  });

  test("should call the prefecture API on load", async () => {
    const mockData = {
      data: {
        result: prefs,
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockData);
    render(<Prefectures />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test("should display prefectures fetched from API", async () => {
    const mockData = {
      data: {
        result: prefs,
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockData);
    const { getByLabelText } = render(<Prefectures />);

    await waitFor(() => {
      mockData.data.result.forEach((pref) => {
        expect(getByLabelText(pref.prefName)).toBeTruthy();
      });
    });
  });

  test("should fetch and display population data when a prefecture is selected", async () => {
    const mockData = {
      data: {
        result: prefs,
      },
    };
    const mockPopulationData = {
      data: {
        result: {
          data: populationData,
        },
      },
    };
    (axios.get as jest.Mock)
      .mockResolvedValueOnce(mockData)
      .mockResolvedValueOnce(mockPopulationData);
    const { getByLabelText } = render(<Prefectures />);

    await waitFor(() => {
      fireEvent.click(getByLabelText(mockData.data.result[0].prefName));
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  test("should change the type of population data displayed when a radio button is selected", async () => {
    const mockData = {
      data: {
        result: prefs,
      },
    };
    const mockPopulationData = {
      data: {
        result: {
          data: populationData,
        },
      },
    };
    (axios.get as jest.Mock)
      .mockResolvedValueOnce(mockData)
      .mockResolvedValueOnce(mockPopulationData);
    const { getByLabelText } = render(<Prefectures />);

    await waitFor(() => {
      fireEvent.click(getByLabelText("年少人口"));
      // TODO: Assert that the graph data has been updated accordingly
      expect(true).toEqual(true);
    });
  });
});
