import { LayoutStyles } from '../../layouts/layouts.styles';
import Link from 'next/link';

import React from 'react';
import {Accordion, Card} from 'react-bootstrap';

const Sidebar = () => {
    const { SidebarBase } = LayoutStyles;
    const newAccordionStructure = (title, links) => {

        return(
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} style={{cursor: 'pointer'}} eventKey="0">
                        <Card.Title>{title}</Card.Title>
                    </Accordion.Toggle>
                {links.map(link => {
                    return(
                        <Accordion.Collapse key={link.href} eventKey="0">
                        <Card.Body>
                        <Link href={link.href}>
                                {link.title}
                            </Link>
                        </Card.Body>
                    </Accordion.Collapse>
                    )
                })}
                </Card>
            </Accordion>
        )
    };

const ReactInicianteLinks = [
    {title: 'Desafio JSX Arrys', href: '/ReactIniciante/JSXArrays'},
]

const ReactHooksLinks = [
    {title: 'Desafio useState 3', href: '/ReactHooks/useState3'},
    {title: 'Desafio useEffect 2', href: '/ReactHooks/useEffect2'},
    {title: 'Desafio Context', href: '/ReactHooks/useContext2'},
];

const FomrulariosLinks = [
    {title: 'Desafio Input', href: '/Formularios/Input2'},
    {title: 'Desafio Checkbox', href: '/Formularios/Checkbox2'},
    {title: 'Desafio Quiz', href: '/Formularios/Quiz'},
];


const RouterLinks = [
    {title: 'Desafio Router 1', href: '/ReactRouter/DesafioRouter1'},
    {title: 'Desafio Router 2', href: '/ReactRouter/DesafioRouter2'},
];

    return (
        <SidebarBase>
            {newAccordionStructure('React Iniciante', ReactInicianteLinks)}
            {newAccordionStructure('React Hooks', ReactHooksLinks)}
            {newAccordionStructure('Formulários', FomrulariosLinks)}
            {newAccordionStructure('React Router', RouterLinks)}
      </SidebarBase>
    );
}

export default Sidebar;
