import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getUserRequest } from '../../../actions/evidence_request';
import NavigationService from '../../services/NavigationService';
import IndUpdates from '../../components/ExploreProject/Updates';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Spinner from '../../components/Spinner';
import { WHITE } from '../../utils/constants';
import ExtStyles from '../../utils/styles';


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 15,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    marginTop: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width / 2,
  },
});

const textForFunder = "You haven't created any task";
const otherText = "You haven't been assigned any task";

class Updates extends Component {

  state = {
    loading: true,
  };

  async componentDidMount() {
    await this.loadEvidenceRequest();
  }

  loadEvidenceRequest = async () => {
    try {
      await this.props.loadRequest(this.props.project._id);
      this.setState({ loading: false });
    }
    catch (err) {
      this.setState({ error: error.message, loading: false });
    }
  }
  render() {
    const { project, userRole, updateTask } = this.props;
    const request = this.props && this.props.request && this.props.request.request || [];
    const { loading } = this.state;
    if (loading) {
      return (
        <View style={ExtStyles.center}>
          <Spinner />
        </View>
      )
    }
    if (request && request.length === 0) {
      return (
        <View style={ExtStyles.center}>
          <Text> {userRole === 'funder' ? textForFunder : otherText} </Text>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Fragment>
          {request &&
            request.map((c, index) => (
              <IndUpdates
                allData={c}
                userRole={userRole}
                key={index}
                text={c.text}
                projectName={project.name}
                title={c.level === 'project' ? c.title : c.task.name}
                statusText={c.status}
                dataType={c.datatype}
                updateTask={updateTask}
              />
            ))}
        </Fragment>
      </ScrollView>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  loadRequest: projectId => dispatch(getUserRequest(projectId)),
});

const mapStateToProps = state => ({
  request: state.request,
});

export default connect(mapStateToProps, mapDispatchToProps)(Updates);
