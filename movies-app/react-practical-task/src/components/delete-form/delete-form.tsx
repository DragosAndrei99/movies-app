import { MouseEventHandler } from "react";


export default function DeleteForm({ handleDelete }: { handleDelete: MouseEventHandler }) {
  return (
    <div className="flex-col mx-6">
      <h3>Are you sure you want to delete this movie?</h3>
      <div className="flex justify-end py-4">
        <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 focus:outline-none" onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  )
}