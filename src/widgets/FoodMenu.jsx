import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CardDescription } from '../components/ui/card';

export default function FoodMenu() {
    return (
        <section className="py-4">
            <Card>
                <CardHeader>
                    <CardTitle>Menu</CardTitle>
                    <CardDescription>
                        Meals are plated and served with a side sald and
                        potatos.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-around">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rosemary Roasted Chicken</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Plain Prime Rib</CardTitle>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>WoodFired Salmon</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p></p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </section>
    );
}
