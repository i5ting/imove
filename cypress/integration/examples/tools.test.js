/// <reference types="cypress" />

// 工具栏测试
context('Actions', () => {
  const toolSelector = (i, j, k) => {
    if (k) {
      return `.index-module_container__1D841 > :nth-child(${i}) > :nth-child(${j})> :nth-child(${k})`
    } else {
      return `.index-module_container__1D841 > :nth-child(${i}) > :nth-child(${j})`
    }
  }
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.get('div.ant-modal-confirm-btns > button:nth-child(1)').click({ force: true })
  })

  function moveNode(selector, x, y) {
    cy.get(selector).eq(0)
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', { clientX: x, clientY: y, force: true })
      .trigger('mouseup', { force: true })
  }

  // 第一组
  it('保存', () => {
    const save = cy.get(toolSelector(1, 1))
  })
  it('适配窗口', () => {
    const fitWindow = cy.get(toolSelector(1, 2))
  })
  it('撤销', () => {
    const undo = cy.get(toolSelector(1, 3))
    const node = 'svg > g > g.x6-graph-svg-stage > g:nth-child(1)'
    moveNode(node, 350, 300)
    moveNode(node, 350, 300)
    undo.click({ multiple: true, force: true })
    undo.click({ multiple: true, force: true })
    cy.get(node).should('have.length', 2)
  })
  it('重做', () => {
    const redo = cy.get(toolSelector(1, 4))
    const node = 'svg > g > g.x6-graph-svg-stage > g:nth-child(1)'
    moveNode(node, 350, 300)
    redo.click()
    redo.click()
    cy.get(node).should('have.length', 2)
  })

  // 第二组
  it('缩小', () => {
    const zoomOut = cy.get(toolSelector(2, 1, 1))
  })
  it('放大', () => {
    const zoomIn = cy.get(toolSelector(2, 1, 2))
  })

  // 第三组
  it('修改字号', () => {
    const fontSize = cy.get(toolSelector(3, 1))
  })
  it('修改字重', () => {
    const fontWeight = cy.get(toolSelector(3, 2))
  })
  it('修改斜体', () => {
    const italic = cy.get(toolSelector(3, 3))
  })
  it('修改下划线', () => {
    const underline = cy.get(toolSelector(3, 4))
  })

  // 第四组
  it('修改文字颜色', () => {
    const textColor = cy.get(toolSelector(4, 1))
  })
  it('修改背景颜色', () => {
    const bgColor = cy.get(toolSelector(4, 2))
  })
  it('修改边框颜色', () => {
    const borderColor = cy.get(toolSelector(4, 3))
  })
  it('修改线条样式', () => {
    const lineStyle = cy.get(toolSelector(4, 4))
  })

  // 第五组
  it('修改水平方向对齐', () => {
    const align = cy.get(toolSelector(5, 1))
  })
  it('修改垂直方向对齐', () => {
    const vertical = cy.get(toolSelector(5, 2))
  })

  // 第六组
  it('修改层级置顶', () => {
    const top = cy.get(toolSelector(6, 1))
  })
  it('修改层级置底', () => {
    const bottom = cy.get(toolSelector(6, 2))
  })
})