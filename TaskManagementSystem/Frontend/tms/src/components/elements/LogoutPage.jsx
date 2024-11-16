import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter,Button } from '../ui';

import { Link } from 'react-router-dom';

const LogoutPage = () => {
    const [isOpen, setIsOpen] = useState(true);

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogTitle className="text-2xl font-semibold text-center">
                        You have successfully logged out
                    </DialogTitle>
                    <DialogDescription className="mt-4 text-center text-gray-600">
                        Thank you for using our service. We hope to see you again soon!
                    </DialogDescription>
                    <DialogFooter className="mt-6">
                        <Button onClick={closeDialog} className="w-full">
                            <Link to="/login" className="text-white">
                                Return to Login
                            </Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LogoutPage;  