"use client";
import { useFormContext } from "@/components/form-provider";

const Home = () => {
  const { formData, handleChange, handleSave, isDirty, findDiff, autosave, toggleAutosave } = useFormContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black">

    <div className="bg-white w-full flex flex-col p-4 rounded-lg shadow-md">
      <label>
        Name:
        <input className="w-full flex-1 h-11 rounded-lg border-2 border-black" placeholder="Enter your name" type="text" name="name" value={formData.name || ""} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input className=" w-full flex-1 h-11 rounded-lg border-2 border-black" placeholder="Enter your email" type="email" name="email" value={formData.email || ""} onChange={handleChange} />
      </label>
      
      <button className="bg-green-500 text-white rounded-lg p-2 mt-4" onClick={handleSave}>
        Save
      </button>
    
      <button className="bg-red-500 text-white rounded-lg p-2 mt-4" onClick={toggleAutosave}>
        Toggle Autosave (Currently {autosave ? "ON" : "OFF"})
      </button>

      {isDirty && !autosave && (
        <pre>Changes: {JSON.stringify(findDiff(), null, 2)}</pre>
      )}
    </div>
    </div>
  );
};

export default Home;