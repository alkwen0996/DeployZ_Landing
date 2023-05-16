import styled from "styled-components";
import { theme } from "@/styles/theme";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { RiNumber1, RiNumber2 } from "react-icons/ri";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled as mstyled } from "@mui/material/styles";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { info } from "@components/common/Toast/notify";

export default function CheckList() {
  return (
    <>
      <ModalContainer>
        <SInstallGuideNameDiv>
          <STitleDiv>체크 리스트</STitleDiv>
          <SDescDiv>
            <SDescP>
              apt의 패키기 인덱스를 최신화하고,
              <br />
              apt가 HTTPS를 통해 패키지를 설치할 수 있도록 설정
            </SDescP>
          </SDescDiv>
        </SInstallGuideNameDiv>
        {timelineData.map((data, index) => (
          <VerticalTimelineElement
            intersectionObserverProps={{
              root: null,
              rootMargin: "0px",
              threshold: 1.0,
            }}
            key={index}
            iconStyle={{
              background: `${theme.colors.secondary}`,
              color: `${theme.colors.white}`,
            }}
            icon={data.icon}
            contentStyle={{
              borderRadius: "1rem",
              width: "88%",
              padding: "2rem",
            }}
            style={{ margin: "1rem 0" }}
          >
            <NumTitle>{data.title}</NumTitle>
            {data.content}
          </VerticalTimelineElement>
        ))}
      </ModalContainer>
    </>
  );
}

const SDescP = styled.p`
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.normal};
  line-height: 160%;
  color: ${theme.colors.white};
`;

const SDescDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const SInstallGuideNameDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: -1rem;
`;

const STitleDiv = styled.div`
  font-size: 4.5rem;
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeight.semibold};
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 85%;
  border: none;
  padding: 0 1rem;
  /* box-shadow: 0 2px 4px, 0px 1px 2px inset; */
  border-radius: 4vh;
  /* background: ${theme.colors.container}; */
  color: ${theme.colors.primary};
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CopyIcon = mstyled(ContentCopyIcon)({
  marginLeft: "1rem",
  color: `${theme.colors.primary}`,
  "&:hover": {
    color: `${theme.colors.secondary}`,
    transition: "all .2s ease-out",
    transform: "scale(1.3)",
    cursor: "pointer",
  },
});
const NumTitle = styled.div`
  display: flex;
  color: ${theme.colors.primary};
  font-weight: ${theme.fontWeight.extrabold};
  padding-bottom: 0.5rem;
  font-size: 2.2rem;
`;
const Contentdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 0;
`;
const ColorContainer = styled.div`
  background-color: ${theme.colors.lightgray};
  font-weight: ${theme.fontWeight.semibold};
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const timelineData = [
  {
    icon: <RiNumber1 />,
    title: "1. apt 패키지 인덱스 최신화",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo systemctl stop nginx"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>sudo apt-get update</text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
      </Contentdiv>
    ),
  },
  {
    icon: <RiNumber2 />,
    title: "2. apt가 HTTPS를 통해 패키지 설치 가능하도록 설정",
    content: (
      <Contentdiv>
        <CopyToClipboard
          className="Toram"
          text="sudo apt-get update"
          onCopy={() => info("복사되었습니다.")}
        >
          <ColorContainer>
            <text>
              sudo apt-get install \ <br />
              ca-certificates \ <br />
              curl \ <br />
              gnupg \ <br />
              lsb-release
            </text>
            <CopyIcon />
          </ColorContainer>
        </CopyToClipboard>
      </Contentdiv>
    ),
  },
];
