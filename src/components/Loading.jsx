import { RxUpdate } from "react-icons/rx";

function Loading({ text }) {
  return (
    <div className=" fixed w-full h-screen bg-dark/60  ">
      <div className=" flex justify-center mt-16">
        <div className=" space-y-4">
          <div className=" flex justify-center ">
            <RxUpdate size={30} className=" animate-spin" fill="white" />
          </div>
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
