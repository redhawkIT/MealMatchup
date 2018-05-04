import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';
import { tileProps } from './shared/propTypes';
import EventCardSlot from '../EventCard/EventCardSlot';
class Tile extends Component {
    render() {
        let classes = this.props.classes;
        let date = this.props.date;
        let dateTime = this.props.dateTime;
        let maxDate = this.props.maxDate;
        let maxDateTransform = this.props.maxDateTransform;
        let minDate = this.props.minDate;
        let minDateTransform = this.props.minDateTransform;
        let onClick = this.props.onClick;
        let onMouseOver = this.props.onMouseOver;
        let style = this.props.style;
        let tileClassName = this.props.tileClassName;
        let tileContent = this.props.tileContent;
        let tileDisabled = this.props.tileDisabled;
        let view = this.props.view;
        return (
            <div
                className={mergeClassNames(
                    classes,
                    tileClassName instanceof Function
                        ? tileClassName({ date, view })
                        : tileClassName
                )}
                disabled={
                    (minDate && minDateTransform(minDate) > date) ||
                    (maxDate && maxDateTransform(maxDate) < date) ||
                    (tileDisabled && tileDisabled({ date, view }))
                }
                onClick={onClick && (() => onClick(date))}
                onMouseOver={onMouseOver && (() => onMouseOver(date))}
                onFocus={onMouseOver && (() => onMouseOver(date))}
                style={style}
            >
                <time dateTime={dateTime} className={this.props.dateClass}>
                    {date.getDate()}
                </time>

                {typeof tileContent === 'function'
                    ? tileContent({ date, view })
                    : tileContent}

                <EventCardSlot
                    account={this.props.account}
                    deliveries={this.props.deliveries}
                />
            </div>
        );
    }
}

Tile.propTypes = {
    ...tileProps
    // children: PropTypes.node.isRequired,
    // dateTime: PropTypes.string.isRequired,
    // maxDateTransform: PropTypes.func.isRequired,
    // minDateTransform: PropTypes.func.isRequired
};

export default Tile;
