export function Loader() {
    return (
        <div className="min-h-60 flex flex-col shadow-2xs rounded-xl">
            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <div className="flex justify-center">
                    <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-accent rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}