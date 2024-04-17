export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) {

  return (
    <th onClick={(e) => sortChanged(name)} scope="col">
      <div className="flex justify-between items-center cursor-pointer">
        {children}
        {sortable && 
          <div className="d-flex flex-column">
            <i
              className={
                "bi bi-chevron-up mx-2 fontSize" +
                (sort_field === name && sort_direction === "asc"
                  ? " text-warning"
                  : "")
              }
            ></i>
            <i
              className={
                "bi bi-chevron-down mx-2 fontSize" +
                (sort_field === name && sort_direction === "desc"
                  ? " text-warning"
                  : "")
              }
            ></i>
          </div>
        }
      </div>
    </th>
  );
}
