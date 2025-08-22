type CarPageType = {
    type: "cars" | "equipment" | "mechanisms";
}

const CarPage = ({type}: CarPageType) => {
    return (
        <div>
            {type}
        </div>
    );
};

export default CarPage;