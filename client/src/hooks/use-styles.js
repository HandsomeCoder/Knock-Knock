import { makeStyles } from "@material-ui/core/styles";

const useStyles = (style) => {
  return makeStyles((theme) => style)();
};

export default useStyles;
