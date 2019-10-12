import * as React from "react";
import '@styles/index.scss'
import {Button} from "antd";

@log
class Test extends React.Component{
    render(){
        return(
            <div className='test'>测试
                <Button>我是按钮</Button>
            </div>
        )
    }
}

function log(target: any) {
    // console.log(target)
}

export default Test