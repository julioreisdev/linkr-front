export default function closeDropDown(Status, Setstatus, e) {
    e.preventDefault();
    e.stopPropagation();
    if (Status.dropDown === "able") {
      Setstatus({ ...Status, dropDown: "disable" });
    }
  }