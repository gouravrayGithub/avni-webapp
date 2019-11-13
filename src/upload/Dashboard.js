import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { get, isEmpty, isNil } from "lodash";
import Status from "./Status";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Button from "@material-ui/core/Button";
import FileUpload from "../common/components/FileUpload";
import Types from "./Types";
import api from "./api";
import DropDown from "../common/components/DropDown";

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    color: "#3f51b5"
  },
  uploadDownloadSection: {
    padding: theme.spacing(2)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [entity, setEntity] = React.useState("");
  const [entityForDownload, setEntityForDownload] = React.useState("");
  const [file, setFile] = React.useState();

  const selectFile = (content, userfile) => setFile(userfile);

  const uploadFile = async () => {
    await api.bulkUpload(Types.getCode(entity), file).then(() => setFile());
    setEntity("");
  };

  const downloadSampleFile = async () => {
    await api.downloadSample(Types.getCode(entityForDownload));
    setEntityForDownload("");
  };

  return (
    <Paper className={classes.root}>
      <Paper className={classes.uploadDownloadSection}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Grid container item>
              Upload
            </Grid>
            <Grid container item spacing={2}>
              <Grid container item xs={12} sm={3}>
                <DropDown name="Type" value={entity} onChange={setEntity} options={Types.names} />
              </Grid>
              <Grid container item direction="column" justify="flex-start" xs={12} sm={9}>
                <Grid item>
                  <FileUpload
                    canSelect={!isEmpty(entity)}
                    canUpload={!isNil(file)}
                    onSelect={selectFile}
                    onUpload={uploadFile}
                  />
                </Grid>
                <Grid item>Selected File: {get(file, "name", "")}</Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container item>
              Download Sample
            </Grid>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
              <DropDown
                name="Type"
                value={entityForDownload}
                onChange={setEntityForDownload}
                options={Types.names}
              />
              <Button
                color="primary"
                onClick={downloadSampleFile}
                disabled={isEmpty(entityForDownload)}
              >
                <CloudDownload disabled={isEmpty(entityForDownload)} />
                {" Download"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Status />
    </Paper>
  );
};

export default withRouter(
  connect(
    state => ({}),
    {}
  )(Dashboard)
);
