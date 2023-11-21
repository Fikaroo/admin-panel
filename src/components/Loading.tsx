import { MutatingDots } from "react-loader-spinner";

const Loading = ({ isCenter = false }: { isCenter?: boolean }) => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#FC0"
      secondaryColor="#FC1"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{
        position: "absolute",
        left: "50%",
        top: "50%",
        translate: isCenter ? "-50% -50%" : "50% -50%",
      }}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loading;
