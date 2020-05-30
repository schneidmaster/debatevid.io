import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, formValueSelector } from "redux-form";
import { createVideo } from "components/store/actions";
import Details from "./Details";

const mapStateToProps = (state, ownProps) => {
  const selector = formValueSelector("videoDetails");

  let year = selector(state, "year");
  let tournaments;
  if (year) {
    year = parseInt(year);
    tournaments = state
      .getIn(["common", "tournaments"])
      .filter(tournament => tournament.year === year)
      .sortBy(tournament => tournament.name)
      .map(tournament => ({ value: tournament.id, label: tournament.name }))
      .toArray();
  } else {
    tournaments = [];
  }

  const affSchool = selector(state, "affSchool");
  const negSchool = selector(state, "negSchool");

  const debaters = state
    .getIn(["common", "debaters"])
    .sortBy(debater => debater.getName());
  let affDebaters = [];
  let negDebaters = [];
  if (affSchool) {
    affDebaters = debaters
      .filter(debater => debater.schoolId === affSchool)
      .map(debater => ({ value: debater.id, label: debater.getName() }))
      .toArray();
  }
  if (negSchool) {
    negDebaters = debaters
      .filter(debater => debater.schoolId === negSchool)
      .map(debater => ({ value: debater.id, label: debater.getName() }))
      .toArray();
  }

  const schools = state
    .getIn(["common", "schools"])
    .sortBy(school => school.getName())
    .map(school => ({ value: school.id, label: school.getName() }))
    .toArray();

  const tags = state
    .getIn(["common", "tags"])
    .sortBy(tag => tag.title)
    .map(tag => ({ value: String(tag.id), label: tag.title }))
    .toArray();

  return {
    hide: state.getIn(["segments", "segments"]).size === 0,
    levels: state
      .getIn(["common", "levels"])
      .map((value, label) => ({ value, label }))
      .toArray(),
    types: state
      .getIn(["common", "types"])
      .map((value, label) => ({ value, label }))
      .toArray(),
    tags,
    tournaments,
    schools,
    affDebaters,
    negDebaters,
    debateType: selector(state, "debateType"),
    year,
    affSchool: selector(state, "affSchool"),
    negSchool: selector(state, "negSchool")
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit(values) {
      dispatch(createVideo(values));
    }
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: "videoDetails" })
)(Details);
