import { Counter } from "./counter";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe('Counter', () => {

  test('Should render value passed by props', () => {
    render(<Counter value={0}/>)
    const h1Element: HTMLHeadingElement = screen.getByRole('heading')
    expect(h1Element).toHaveTextContent('0');
  })

  test('Should increment counter', () => {
    render(<Counter value={0}/>)
    const h1Element: HTMLHeadingElement = screen.getByRole('heading')
    fireEvent.click(screen.getByText('Increment'))
    expect(h1Element).toHaveTextContent('1');
  })

  test('Should decrement counter', () => {
    render(<Counter value={0}/>)
    const h1Element: HTMLHeadingElement = screen.getByRole('heading')
    fireEvent.click(screen.getByText('Decrement'))
    expect(h1Element).toHaveTextContent('-1');

  })
})