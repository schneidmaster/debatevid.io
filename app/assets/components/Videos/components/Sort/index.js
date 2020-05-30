import { connect } from "react-redux";
import Sort from "./Sort";
import { setSortOrder } from "components/store/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    sortOrder: state.getIn(["common", "sortOrder"])
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSortOrder(value) {
      dispatch(setSortOrder(value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
