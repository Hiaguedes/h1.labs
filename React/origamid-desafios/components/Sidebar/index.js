import { LayoutStyles } from '../../layouts/layouts.styles';
import Link from 'next/link';

import React from 'react';
import {Accordion, Card} from 'react-bootstrap';

const Sidebar = () => {
    const { SidebarBase } = LayoutStyles;
    return (
        <SidebarBase>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <Card.Title>03 - React Hooks</Card.Title>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Link href="/ReactHooks/useState3">
                                Desafio useState 3
                            </Link>
                        </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Desafio test</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
      </SidebarBase>
    );
}

export default Sidebar;
