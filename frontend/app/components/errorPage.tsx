export default function ErrorView({error,onBack}:any){
    return(
        <>


        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">
          <div className="text-red-500 text-4xl mb-4">!</div>
          <h2 className="text-xl font-bold mb-2"> Error Occured</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button onClick={onBack} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700">
            Back
          </button>
        </div>
      </div>


        
        </>
    )
}