import React, { useEffect, useState } from 'react'
import '../../style/addroom.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import roomApis from '../../api/modules/room';
import { toast } from 'react-toastify';

const EditRoom = ({ number, onClose }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [numberRoom, setNumberRoom] = useState(0)
    const [status, setStatus] = useState("")

    useEffect(() => {
        const getRoom = async () => {
            const { response, err } = await roomApis.getRoomByNumber(number)
            if (response) {
                console.log(response)
                setName(response.name)
                setQuantity(response.seatingCapacity)
                setNumberRoom(response.number)
                setStatus(response.roomStatus)
            }
            if (err) {
                console.log(err)
            }
        }
        getRoom()
    }, [])

    const saveRoom = async (event) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của form

        if (!name || quantity === 0) {
            toast.error("Vui lòng điền đầy đủ thông tin")
        }
        else {
            const data = {
                number: numberRoom,
                name: name,
                seatingCapacity: quantity,
                roomStatus: status,
            };

            const { response, err } = await roomApis.updateRoom(data);
            if (response) {
                console.log(response);
                toast.success("Cập nhật phòng thành công !");
                onClose()
            }
            if (err) {
                console.log(err);
                toast.error(err);
            }
        }
    };

    return (
        <div className="main-add-room">
            <FontAwesomeIcon icon={faXmark} className="icon-addroom" onClick={onClose} />
            <form className="form-addroom" onSubmit={saveRoom}>
                <input
                    className="name-room"
                    placeholder="Tên phòng"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="quality-room"
                    placeholder="Số lượng chỗ ngồi"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <select
                    className="status-room"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="ACTIVATED">ACTIVATED</option>
                    <option value="DELETED">DELETED</option>
                </select>
                <button className="save-addroom" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditRoom