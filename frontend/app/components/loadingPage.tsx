export default function LoadingView(){
    return(
        <>
        

        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <div className="absolute w-full h-full rounded-full border-4 border-solid border-indigo-100"></div>
                {/* Inner Rotating Ring */}
                <div className="absolute w-full h-full rounded-full border-4 border-solid border-indigo-600 border-t-transparent animate-spin"></div>
            </div>
        </div>


        
        </>
    )
}