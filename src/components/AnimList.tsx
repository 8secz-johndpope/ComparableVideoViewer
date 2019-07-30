import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { ListAction, addFiles } from '../redux/actions/ListAction';
import { RootState } from '../redux/reducers';
import { Anim, videoSelector } from '../main/video';
import AnimListItem from './AnimListItem';

interface Props {
  anims: Anim[];
  addFilesToList: (payload: Anim[]) => any;
}

const AnimList: React.FC<Props> = ({ anims, addFilesToList }) => {
  const AnimTagList = anims.map(anim => <AnimListItem key={anim.id} name={anim.path} />);

  const selectFiles = async (): Promise<void> => {
    videoSelector()
      .then((data): void => {
        addFilesToList(data);
      })
      .catch((err): void => {
        console.error(err);
      });
  };

  const handleClick = () => selectFiles();

  return (
    <div>
      <div>애니메이션 목록</div>
      <button onClick={handleClick}>Add+</button>
      {AnimTagList}
    </div>
  );
};

const mapDispatchToProps = (dispatch: React.Dispatch<ListAction>) => ({
  addFilesToList: (payload: Anim[]) => dispatch(addFiles(payload))
});

const mapStateToProps = (state: RootState) => ({
  anims: state.list.anims
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimList);
