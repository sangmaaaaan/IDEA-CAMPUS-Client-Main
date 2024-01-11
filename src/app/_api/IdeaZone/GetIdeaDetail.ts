import { useEffect, useState } from "react";

interface Idea {
  id: string;
  hits: any;
  keyWord: any;
  title: string;
  thumbnail: string;
  nickName: string;
  simpleDescription: string;
  detailedDescription: "string";
  color: string;
  url1: string;
  url2: string;
  createdAt: string;
}

interface ApiResponse {
  check: boolean;
  information: Idea;
  message: string | null;
}

const getIdeaDeatil = (id: string) => {
  const [ideaData, setideaData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchideaData = async () => {
      try {
        const response = await fetch(
          `http://ec2-3-34-14-75.ap-northeast-2.compute.amazonaws.com:8080/api/idea/${id}`
        );
        const result: ApiResponse = await response.json();
        setideaData(result);
      } catch (error) {
        console.error("Error fetching ideaData:", error);
      }
    };

    fetchideaData();
  }, []);

  return ideaData;
};

export default getIdeaDeatil;
