import Loader from '@/utils/Load'
import { deleteClient, deleteGame } from '@/utils/action'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const DeleteUser = ({ id, closeModal, Username, deletePayout, platform, gameName }: any) => {
    const [load, setLoad] = useState(false)
    const handleDelete = async (id: string) => {
        try {
            setLoad(true)
            const response: any = await deleteClient(id)
            if (response?.error) {
                setLoad(false);
                return toast.error(response.error);
            }
            closeModal();
            toast.success(`${Username} deleted successfully`);
        } catch (error) {
             setLoad(false);
        }
    }

    const handleDeleteGame = async (id: string,platform:string) => {
        try {
            setLoad(true)
            const response: any = await deleteGame(platform,id)
            if (response?.error) {
                setLoad(false);
                return toast.error(response.error);
            }
            closeModal();
            toast.success(`${gameName} game deleted successfully`);
        } catch (error) {
            setLoad(false)
        }
    }

    return (
        <>
            <div>
                <p className="text-center dark:text-white">
                    Are you sure you want to delete <span>{Username || gameName} {gameName&&'game'} ?</span>
                </p>
                <div className="flex justify-center gap-10 pt-5">
                    <button
                        className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-500 hover:bg-opacity-75  dark:text-white"
                        onClick={() => closeModal()}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded-md  bg-red-500 dark:bg-red-600 text-white hover:bg-opacity-75 dark:text-white"
                        onClick={() => deletePayout?deletePayout():platform?handleDeleteGame(id,platform):handleDelete(id)}
                    >
                        Delete
                    </button>

                </div>
            </div>
            {load && <Loader />}
        </>
    )
}

export default DeleteUser
