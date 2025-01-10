
const GenericModal = ({
  children,
  className = "modal-box modal-border bg-modal  rounded-[8px] border flex flex-col gap-3 justify-around relative",
  modalId,
}: {
  children: React.ReactNode;
  className?: string;
  modalId: string;
}) => {
  return (
    <label htmlFor={modalId} className="modal  backdrop-blur cursor-pointer">
      <label className={className}>
        {children}
      </label>
    </label>
  );
};

export default GenericModal;
