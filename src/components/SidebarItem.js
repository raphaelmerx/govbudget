import './SidebarItem.css'


const SidebarItem = (props) => {
  return (
    <div className="sidebar-item">
      <div className="dot-content">
        <div className="main-dot"></div>
        {props.hasNext &&
        <div className="dot-trail"><div className="small-dot"></div><div className="small-dot"></div><div className="small-dot"></div><div className="small-dot"></div><div className="small-dot"></div><div className="small-dot"></div></div>
        }
      </div>
      <div className="item-content">
        <div className="label">
            { props.label }
        </div>
        <div className="value">
            { props.value }
        </div>
      </div>
    </div>

  );
}

export default SidebarItem;
