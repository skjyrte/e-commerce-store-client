import {FC} from "react";
import css from "./InvalidPageView.module.scss";
import {Navigate, Link} from "react-router-dom";
import TextLinkElement from "../../components/LinkElements/TextLinkElement";
import InvalidContent from "../../components/InvalidContent";

interface Props {}

const InvalidPageView: FC<Props> = ({}) => {
  return <InvalidContent />;
};

export default InvalidPageView;
