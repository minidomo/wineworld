import MenuItem from './MenuItem';

const Dropdown = ({ submens, dropdown, depthlevel }) => {
    depthlevel += 1;
    const dropdownClass = depthlevel > 1 ? 'dropdown-submenu' : '';

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
            {
                submens.map((submenu, index) => (
                    <MenuItem items={submens} key={index} depthlevel={depthlevel} />
                ))
            }
        </ul>
    );
};

export default Dropdown;
