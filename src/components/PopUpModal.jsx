import { Button, Modal, Flowbite } from "flowbite-react";
import { bool, func, string } from "prop-types";

function PopUpModal({ openModal, setOpenModal, handleEvent, modalTitle, actionTitle }) {
  const customTheme = {
    button: {
      color: {
        primary: "bg-primary hover:bg-[#568783] text-white",
      },
    },
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{modalTitle}</h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                취소
              </Button>
              <Button color="primary" onClick={handleEvent}>
                {actionTitle}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}

PopUpModal.propTypes = {
  openModal: bool,
  setOpenModal: func,
  handleEvent: func,
  modalTitle: string,
  actionTitle: string,
};

export default PopUpModal;
