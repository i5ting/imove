/// <reference types="cypress" />

context('Actions', () => {
    // 1. 打开http://localhost:8001/
    beforeEach(() => {
        cy.visit('http://localhost:8001/')
    })

    // 2. 测试是否能将左侧的组件拖动到画布中
    it('the components on the left can be dragged into the canvas', () => {

    })

    // 3. 测试是否可修改节点的显示名称、逻辑触发名称、代码、投放配置schema、依赖
    it('you can modify the display name, logical trigger name, code, delivery configuration schema, and dependencies of the node', () => {

    })

    // 4. 测试能够run起来一个最小流程（写好代码）
    it('A minimal process can be run', () => {

    })

    // 5. 测试更改节点位置，输出结果不变
    it('ensure that the node position is changed and the output result remains unchanged', () => {

    })
})