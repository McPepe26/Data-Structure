export const getGroupFromModal = () => {
    let inputName = document.getElementById("groupName");
    let checkPublic = document.getElementById("public");

    return {
        groupName: inputName.value,
        public: checkPublic.checked
    }
}