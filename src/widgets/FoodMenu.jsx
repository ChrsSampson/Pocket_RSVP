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
                <CardContent className="flex flex-col sm:flex-row gap-3 sm:gap-0  justify-around">
                    <Card>
                        <CardHeader>
                            <CardTitle>Roasted Italian Chicken</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Garden Salad with dressing</p>
                            <p>
                                Baby Roasted Potatos, Grilled Seasonal
                                Vegtables, Dinner Rolls
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Prime Rib</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Garden Salad with dressing</p>
                            <p>
                                Baby Roasted Potatos, Grilled Seasonal
                                Vegtables, Dinner Rolls
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Maple Glazed Salmon</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Garden Salad with dressing</p>
                            <p>
                                Baby Roasted Potatos, Grilled Seasonal
                                Vegtables, Dinner Rolls
                            </p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </section>
    );
}
