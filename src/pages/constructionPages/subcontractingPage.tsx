type SubcontractingPagePropsType = {
    type?: "sub" | "supply";
}


const SubcontractingPage = ({type}: SubcontractingPagePropsType) => {
    return (
        <div>
            {type}
        </div>
    );
};

export default SubcontractingPage;