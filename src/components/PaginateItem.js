import React from 'react'

class PaginateItem extends React.Component {
    render() {
        const {label, link, active} = this.props.pagination;
        return (
            <a className={`item ${active ? "active" : ""}`}>
                {label}
            </a>
        );
    }
}

export default PaginateItem;