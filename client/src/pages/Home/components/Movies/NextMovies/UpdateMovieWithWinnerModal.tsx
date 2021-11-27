import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { useUser } from '../../../../../context/user-context';
import * as dateFns from 'date-fns';
import StoredMovieItem from '../../../../../interfaces/StoredMovieItem';

interface UpdateMovieWithWinnerModalProps {
  movie?: StoredMovieItem;
  onClose: any;
  onOpen: any;
  isOpen: boolean;
}
const UpdateMovieWithWinnerModal: React.FC<UpdateMovieWithWinnerModalProps> = ({
  movie,
  onClose,
  onOpen,
  isOpen,
}) => {
  const [currentUser, setCurrentUser] = useUser();
  return (
    <Modal
      onClose={onClose}
      onOpen={onOpen}
      open={isOpen}
      trigger={
        <Button
          disabled={currentUser.apiToken.length === 0}
          color="green"
          basic
          icon
        >
          <Icon name="winner" />
        </Button>
      }
    >
      {movie && (
        <>
          <Modal.Header>Add Winner for {movie.name}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label htmlFor="">Winners Name</label>
                <input type="text" placeholder="winners name" />
              </Form.Field>
              <Form.Field>
                <label htmlFor="">Date Guessed</label>
                <input
                  disabled
                  value={dateFns.format(new Date(), 'yyyy-MM-dd')}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={onClose}>
              Close
            </Button>
            <Button
              content="Update Winner"
              labelPosition="right"
              icon="checkmark"
              positive
            />
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};

export default UpdateMovieWithWinnerModal;
