import { WidgetStyles } from './Widget.styles'
import Radio from '../Radio'

const Widget = ({title, options, ...props}) => {
    const { Widget } = WidgetStyles;

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Widget>
                <Widget.Title>{title}</Widget.Title>
                <Radio options={options} {...props}/>
            </Widget>
        </div>
    )
}

export default Widget;