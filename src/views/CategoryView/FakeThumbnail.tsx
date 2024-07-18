import {FC} from "react";
/* temporary component TO BE DELETED */
const FakeThumbnail: FC<{id: string}> = (props) => {
  const {id} = props;
  return (
    <div style={{width: "50px", height: "100px", backgroundColor: "yellow"}}>
      {id}
    </div>
  );
};

export default FakeThumbnail;
