type DocContentPageType = {
    type?: "enter" | "exit";
};

const DocContentPage = ({type}: DocContentPageType) => {
    return (
        <div>
            {type}
        </div>
    );
};

export default DocContentPage;