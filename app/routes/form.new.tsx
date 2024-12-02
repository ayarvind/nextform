import { useNavigate } from "@remix-run/react";
import { useState } from "react";

function Index() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleLogoChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file));
        }
    };

    const handleSave = ()=>{
        
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 mt-6 mb-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Create Form
                </h2>

                {/* Name Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter a name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Description Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Small Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter a small description"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Logo Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Logo
                    </label>
                    {logo ? (
                        <div className="flex items-center justify-center">
                            <img
                                src={logo}
                                alt="Logo Preview"
                                className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 shadow-sm mb-4"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 text-gray-400 mb-4">
                            No Logo
                        </div>
                    )}
                    <label
                        htmlFor="logo-upload"
                        className="inline-block px-4 py-2 text-sm text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500"
                    >
                        Choose File
                    </label>
                    <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-all"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Index;
