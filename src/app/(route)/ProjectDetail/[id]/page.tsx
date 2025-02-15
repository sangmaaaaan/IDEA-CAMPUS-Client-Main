"use client";

import React, { useState } from "react";

import Image from "next/image";
import projectDetailBackgroundTop from "public/projectgallery/projectDetailBackgroundTop.png";
import projectGalleryIcon from "public/projectgallery/projectGalleryIcon.svg";
import previousButton from "public/projectgallery/previousButton.svg";
import nextButton from "public/projectgallery/nextButton.svg";
import indexIcon from "public/projectgallery/indexIcon.svg";
import gitHubButton from "public/projectgallery/gitHubButton.svg";
import googleButton from "public/projectgallery/googleButton.svg";
import webButton from "public/projectgallery/webButton.svg";
import { usePathname, useRouter } from "next/navigation";
import GetProjectDetail from "@/app/api/gallery/GetProjectDetail";
import { NavBar } from "@/app/components/components/naviBar";
import DeleteProject from "@/app/api/gallery/DeleteProject";
import GetCheckProjectId from "@/app/api/gallery/GetCheckProjectId";

const ProjectDetail = () => {
  const exampleText =
    "죄송합니다, 저는 외부로 링크를 생성하거나 직접적인 외부 서비스에 접속하여 정보를 업데이트하는 기능을 지원하지 않습니다. 하지만 글을 위한 예시를 드릴게요.한 오래된 마을의 이야기를 담은 깃허브 레포지토리가 있다면, 그 곳에서는 마을 주민들의 삶과 문화를 소개하는 문서들과 사진들이 모여있을 것입니다. 이 마을은 옛 생활 방식을 유지하면서도 현대의 변화와 조화를 이루고 있습니다. 이 레포지토리 안에는 마을의 역사와 전설, 그리고 주변 자연 환경을 소개하는 파일들이 있을 것입니다. 사람들은 이를 통해 마을의 아름다움과 자연 속에서의 평화로운 삶을 감상할 수 있을 것입니다. 또한, 마을의 지역 행사나 문화 행사에 대한 정보도 담겨 있을 것입니다. 이 깃허브 레포지토리는 마을을 알리는 데 사용되며, 주민들은 이를 통해 마을에 대한 자부심을 느낄 것입니다. 마을에 관심 있는 사람들은 여기를 방문하여 다양한 정보와 이야기를 나누며, 마을을 더 깊이 이해하고 소통할 수 있을 것입니다. 이는 지역사회와 온라인 커뮤니티 간의 연결을 도모하는 데에 큰 도움이 될 것입니다. 죄송합니다, 저는 외부로 링크를 생성하거나 직접적인 외부 서비스에 접속하여 정보를 업데이트하는 기능을 지원하지 않습니다. 하지만 더 많은 글을 통해 이야기를 이어가겠습니다. 마을의 깃허브 레포지토리에는 마을 주변의 아름다운 자연 경관과 함께 주민들의 일상, 그들이 속한 공동체의 소식들이 담겨 있을 것입니다. 이곳은 주민들이 일상의 사진이나 행사 소식을 나누며 마을의 아름다움과 활기를 전하고 있는 곳입니다. 또한, 마을 주민들이 전해온 다양한 이야기와 전설들이 기록되어 있을 것입니다. 이들은 세대를 초월하여 전해져 온 마을의 문화와 역사를 반영합니다. 그리고 지난 날의 모습과 현재의 변화가 어우러져 마을의 아이덴티티를 형성하고 있습니다. 이 레포지토리는 마을에 관심 있는 이들에게 마을의 특별함과 매력을 전달하는 중요한 수단이 될 것입니다. 지역 사회와의 소통을 통해 다양한 혜택을 주민들에게 제공하며, 더 넓은 공동체와의 연결성을 높일 수 있는 좋은 기회가 될 것입니다. 마을의 아름다움과 따뜻한 이야기가 깃허브 레포지토리를 통해 세상과 소통하며 더 많은 이들에게 전달될 수 있기를 바랍니다.";
  const pathname = usePathname();
  //id가져오는 문자열 함수
  const id = Number(pathname.split("/")[2]);
  const checkId = GetCheckProjectId(id);

  const projectData = GetProjectDetail(id)?.information;

  const router = useRouter();

  const handleButtonClick = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank"); // Opens the URL in a new tab or window
    }
  };

  const handleFix = () => {
    router.push(`/FixProject/${id}`);
  };

  //이미지 배열
  const images: string[] = [];
  // thumbnail이 존재하면 추가
  if (projectData?.thumbnail) {
    images.push(projectData.thumbnail);
  }

  // otherImages가 존재하면 추가
  if (projectData?.otherImages) {
    images.push(...projectData.otherImages);
  }

  while (images.length < 3) {
    images.push("/public/projectgallery/whitebackground.png");
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleDelete = () => {
    try {
      DeleteProject(id);
      alert("성공적으로 삭제되었습니다.");
      router.push("/ProjectGallery");
    } catch (error) {
      console.error("Error fetching ideaData:", error);
    }
  };
  console.log(images);
  return (
    <div>
      <NavBar />
      <main className="flex flex-col bg-white items-center justify-center relative">
        <div className="mt-[100px] h-full z-10">
          <Image
            src={projectDetailBackgroundTop}
            alt={"projectDetailBackground"}
            width={1005}
          />
        </div>

        <div className="mt-[-800px] p-10 w-[1000px] mx-auto items-center justify-center flex flex-col text-center z-10">
          <p className="text-white text-4xl font-bold">{projectData?.title}</p>
          <div className="flex">
            {projectData?.booleanWeb && (
              <p className="mt-5 w-20 h-8 p-1 ml-1 text-sm border-2 border-[#B034F7] rounded-3xl bg-white text-black">
                웹
              </p>
            )}
            {projectData?.booleanApp && (
              <p className="mt-5 w-20 h-8 p-1 ml-1 text-sm border-2 border-[#B034F7] rounded-3xl bg-white text-black">
                앱
              </p>
            )}
            {projectData?.booleanAi && (
              <p className="mt-5 w-20 h-8 p-1 ml-1 text-sm border-2 border-[#B034F7] rounded-3xl bg-white text-black">
                AI
              </p>
            )}
          </div>

          <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex items-center">
              {/* Previous Image */}
              <div className="flex items-center justify-center w-[250px] mr-[-50px] h-[250px] rounded-xl bg-white">
                <Image
                  src={
                    images[
                      currentIndex === 0 ? images.length - 1 : currentIndex - 1
                    ]
                  }
                  alt={`Slide ${
                    currentIndex === 0 ? images.length - 1 : currentIndex - 1
                  }`}
                  width={250}
                  height={250}
                />
              </div>
              {/* Current Image */}
              <div className="flex items-center justify-center w-[300px] h-[300px] rounded-xl bg-white z-20">
                <Image
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  width={300}
                  height={300}
                />
              </div>

              {/* Next Image */}
              <div className="flex items-center justify-center right-[350px] w-[250px] ml-[-50px] h-[250px] rounded-xl bg-white">
                <Image
                  src={
                    images[
                      currentIndex === images.length - 1 ? 0 : currentIndex + 1
                    ]
                  }
                  alt={`Slide ${
                    currentIndex === images.length - 1 ? 0 : currentIndex + 1
                  }`}
                  width={250}
                  height={250}
                />
              </div>
            </div>
            <div className="flex items-center mt-[-170px] justify-between space-x-48 z-20">
              <button className="flex items-center p-4" onClick={goToPrevious}>
                <Image src={previousButton} alt="nextButton" />
              </button>
              <button className="flex items-center p-4" onClick={goToNext}>
                <Image src={nextButton} alt="nextButton" />
              </button>
            </div>
          </div>
          <p className="text-xl mt-40 text-white">
            {projectData?.simpleDescription}
          </p>
        </div>
        <div className="mt-[-100px] mb-20 w-[1000px] h-auto border-2 border-gray-100 rounded-2xl shadow-lg bg-white">
          <div className="flex mx-32 mt-[350px]">
            <div className="flex items-center space-x-2 border-l-2 border-solid h-auto border-purple-500 mb-10">
              <div className="ml-[-10px] mt-[-10px]">
                <div className="flex flex-col">
                  <div className="flex">
                    <Image src={indexIcon} alt="indexIcon" />
                    <p className="text-black font-bold text-2xl ml-4">
                      상세 설명
                    </p>
                  </div>
                  <p className="mt-5 ml-12 text-black text-lg">
                    {projectData?.detailedDescription}
                  </p>
                </div>

                <div className="flex flex-col mt-20">
                  <div className="flex">
                    <Image src={indexIcon} alt="indexIcon" />
                    <p className="text-black font-bold text-2xl ml-4">
                      팀 정보
                    </p>
                  </div>
                  <p className="mt-5 ml-12 text-black text-lg">
                    {projectData?.teamInformation}
                  </p>
                </div>
                <div className="flex flex-col mt-20">
                  <div className="flex">
                    <Image src={indexIcon} alt="indexIcon" />
                    <p className="text-black font-bold text-2xl ml-4">
                      GitHub 링크
                    </p>
                  </div>
                  <p className="mt-5 ml-12 text-black text-lg">
                    클릭 시 해당 주소로 이동합니다.
                  </p>
                  <div className="mt-6 ml-24 mb-10 flex space-x-4">
                    {projectData?.githubUrl && (
                      <Image
                        src={gitHubButton}
                        alt="GitHubButton"
                        onClick={() => handleButtonClick(projectData.githubUrl)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {projectData?.webUrl && (
                      <Image
                        src={webButton}
                        alt="WebButton"
                        onClick={() => handleButtonClick(projectData.webUrl)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                    {projectData?.googlePlayUrl && (
                      <Image
                        src={googleButton}
                        alt="GoogleButton"
                        onClick={() =>
                          handleButtonClick(projectData.googlePlayUrl)
                        }
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex">
                  <Image src={indexIcon} alt="indexIcon" />
                </div>
              </div>
            </div>
          </div>
          {checkId && (
            <div className="items-center justify-center mb-20 mt-24 flex space-x-5">
              <button
                className="w-20 h-9 p-1 text-xs bg-gray-400 hover:bg-purple-500 rounded-xl text-white"
                type="button"
                onClick={() => handleFix()}
              >
                수정하기
              </button>
              <button
                className="w-20 h-9 p-1 text-xs bg-gray-400  hover:bg-purple-500  rounded-xl text-white"
                type="button"
                onClick={() => handleDelete()}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
