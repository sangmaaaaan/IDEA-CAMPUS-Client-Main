import { useEffect, useState } from "react";

interface Idea {
  title: string;
  simpleDescription: string;
  keyword: string;
  nickName: string;
  color: string;
}

interface ApiResponse {
  check: boolean;
  information: Idea[];
  message: string | null;
}

const getIdeaHome = () => {
  const [ideaData, setIdeaData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchIdeaData = async () => {
      try {
        const response = await fetch(
          "http://ec2-3-34-14-75.ap-northeast-2.compute.amazonaws.com:8080/api/home/idea"
        );
        const result: ApiResponse = await response.json();
        setIdeaData(result);
      } catch (error) {
        console.error("Error fetching ideaData:", error);
      }
    };

    fetchIdeaData();
  }, []);

  return ideaData;
};

export default getIdeaHome;
