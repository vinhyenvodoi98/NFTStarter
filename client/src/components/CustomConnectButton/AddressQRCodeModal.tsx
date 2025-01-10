import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "@starknet-react/chains";
import { Address } from "@/components/Address";

type AddressQRCodeModalProps = {
  address: AddressType;
  modalId: string;
};

export const AddressQRCodeModal = ({
  address,
  modalId,
}: AddressQRCodeModalProps) => {
  return (
    <>
      <div>
        <input type="checkbox" id={`${modalId}`} className="modal-toggle" />
        <label htmlFor={`${modalId}`} className="modal cursor-pointer">
          <label className="modal-box relative">
            <label
              htmlFor={`${modalId}`}
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
            >
              ✕
            </label>
            <div className="space-y-3 py-6">
              <div className="flex space-x-4 flex-col items-center gap-6">
                <QRCodeSVG value={address} size={256} />
                <Address address={address} format="short" disableAddressLink />
              </div>
            </div>
          </label>
        </label>
      </div>
    </>
  );
};
