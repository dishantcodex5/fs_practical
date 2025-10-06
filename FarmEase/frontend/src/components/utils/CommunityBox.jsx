

const CommunityBox = ({roomId, communityName, communityDesc}) => {
    return (
        <>
            <div class="bg-white p-4 shadow-md">
                <h3 class="text-lg font-bold">{communityName}</h3>
                <p class="mt-2">{communityDesc}</p>
            </div>
        </>
    )
}


export default CommunityBox