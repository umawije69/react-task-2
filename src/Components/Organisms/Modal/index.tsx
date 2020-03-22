import React, { FunctionComponent } from 'react'
import { Modal, Row, Col, Input, Checkbox, Select, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'


export interface ModalProps {
    visible: boolean,
    handleCancel: ()=>void

}

const {Option} = Select


const StyledRow: typeof Row = styled(Row)`

    margin: 1rem 0;
    

`
const StyledHeaderRow: typeof Row = styled(Row)`

    input {
        border: none;
        
    }

    border: 0;
    border-bottom: 1px solid;
    
    #input-column {
        border-right: 1px solid;
    }

    padding: 0rem 0.5rem;
    height: 4rem;

`


const StyledColumn: typeof Col = styled(Col)`

    
    &#fusion-text {
        text-align: right;
        font-size: 12px;
    }

`

const StyledHeaderColumn : typeof Col = styled(Col)`

    &{
        padding-top: 1rem;
    }

`
const CheckBoxColumn: typeof Col = styled(Col)`

    
    text-align: center;

    font-size: 12px;
    
    .ant-checkbox-wrapper {
        margin: 0 0.5rem;
    }

    &{
        padding-top: 1rem;
    }

`

const ListWrapper = styled.div`

    padding: 1rem 2rem;

    #fusion-text-2 {
        font-size: 12px;
    }

    

`

const ListItem = styled.div`

    border: 0.5px solid gray;
    margin 1rem 0;
    padding: 0.5rem 1rem;
    
`

const StyledSelect: typeof Select = styled(Select)`

        &.styled-select .ant-select-selector{
                border: none;

            }

        &.styled-select .ant-select-arrow {
        
        }

        &{
            width: 90%;
        }


            
            
`

export const ModalComponent: FunctionComponent<ModalProps> = ({visible,handleCancel})=>{
  
    

    return (
        <Modal
          visible={visible}
          onCancel={handleCancel}
          footer={null}
          closable={true}
          width={"80%"}
          bodyStyle={{padding: 0}}
        >


        <StyledHeaderRow>
                        <StyledHeaderColumn id="input-column" span={14} ><Input size="large" placeholder="Search...." /></StyledHeaderColumn>
                        <StyledHeaderColumn span={5} >
                        <StyledSelect className="styled-select"  defaultValue="Person Name">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                        </StyledSelect>
                        </StyledHeaderColumn>
                        <StyledHeaderColumn span={5}>
                            <Button disabled={true} shape="round">
                            SEARCH
                            </Button>
                        </StyledHeaderColumn>
        </StyledHeaderRow>

        <StyledHeaderRow>
                        <CheckBoxColumn span={8} >Fusion X<Checkbox/> </CheckBoxColumn>
                        <CheckBoxColumn span={8} >Fusion X Pending<Checkbox/> </CheckBoxColumn>
                        <CheckBoxColumn span={8} >Fusion<Checkbox/> </CheckBoxColumn>
        </StyledHeaderRow>

        

        <ListWrapper>

            

            <div id="fusion-text-2">
                Fusion X (83)
            </div>

            {
                [1,2,3,4].map((item)=>(
                    <ListItem key={item}>
                    <StyledRow>
                        <StyledColumn span={6} >Name</StyledColumn>
                        <StyledColumn span={6} >Customer Indentfication</StyledColumn>
                        <StyledColumn offset={4} span={6} >Person Reference Code</StyledColumn>
                        <StyledColumn id="fusion-text" span={2} >Fusion X</StyledColumn>
                    </StyledRow>
                    <StyledRow>
                        <StyledColumn span={6} >John Doe</StyledColumn>
                        <StyledColumn span={6} >858610910v</StyledColumn>
                        <StyledColumn offset={4} span={6} >BANK1</StyledColumn>
                    </StyledRow>
                    </ListItem>
                ))
            }
            

                
        

        </ListWrapper>
        </Modal>
    )
  
}
