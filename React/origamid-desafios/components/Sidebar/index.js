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
                        <Accordion.Collapse eventKey="0" key={link.src}>
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


    return (
        <SidebarBase>
            {newAccordionStructure('React Iniciante', ReactInicianteLinks)}
            {newAccordionStructure('React Hooks', ReactHooksLinks)}
            {newAccordionStructure('Formulários', FomrulariosLinks)}
      </SidebarBase>
    );
}

export default Sidebar;
