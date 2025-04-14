import sampleData from "@/db/sample-data";
import { FormatCurrency } from "@/lib/utils";
import { Order } from "@/types";
import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });
PurchaseReceiptEmail.PreviewProps = {
    order: {
        id: crypto.randomUUID(),
        userId: '12345',
        user: {
            name: 'Goks',
            email: 'goks@gmail.com',
        },
        paymentMethod: 'BudPay',
        shippingAddress: {
            fullName: 'GoksMan',
            streetAddress: 'Abesan',
            city: 'lagos',
            postalCode: '12345',
            country: 'Nigeria'
        },
        createdAt: new Date(),
        itemsPrice: '100',
        shippingPrice: '100',
        totalPrice: '200',
        orderitems: sampleData.products.map((x) => ({
            name: x.name,
            orderId: '123',
            productId: '123',
            slug: x.slug,
            qty: x.stock,
            image: x.images[0],
            price: x.price.toString()
        })),
        isDelivered: true,
        deliveredAt: new Date(),
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
            id: '123',
            status: 'succeeded',
            PricePaid: '100',
            email_address: 'goks@gmail.com'
        }
    }
} satisfies orderInfoProps

type orderInfoProps = {
    order: Order
}
export default function PurchaseReceiptEmail({ order }: orderInfoProps) {
    return (
        <Html>
            <Preview>View Order Receipt</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white" />
                <Container className="max-w-xl">
                    <Heading>Purchase Receipt</Heading>
                    <Section>
                        <Row>
                            <Column>
                                <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                                    Order ID
                                </Text>
                                <Text className="mt-0 mr-4">{order.id.toString()}</Text>
                            </Column>
                            <Column>
                                <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                                    Purchase Date
                                </Text>
                                <Text className="mt-0 mr-4">
                                    {dateFormatter.format(order.createdAt)}
                                </Text>
                            </Column>
                            <Column>
                                <Text className="mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap">
                                    Price Paid
                                </Text>
                                <Text className="mt-0 mr-4">
                                    {FormatCurrency(order.totalPrice)}
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                    <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
                        {order.orderitems.map((item) => (
                            <Row key={item.productId} className="mt-8">
                                <Column className="w-20">
                                    <Img
                                        width={80}
                                        alt={item.name}
                                        className="rounded"
                                        src={
                                            item.image.startsWith("/")
                                                ? `${process.env.NEXT_PUBLIC_DOMAIN}${item.image}`
                                                : item.image
                                        }
                                    />
                                </Column>
                                <Column className="align-top">
                                    {item.name} x {item.qty}
                                </Column>
                                <Column align="right" className="align-top">
                                    {FormatCurrency(item.price)}
                                </Column>
                            </Row>
                        ))}
                        {[
                            { name: 'Items', price: order.itemsPrice },
                            { name: 'Shipping Price', price: order.shippingPrice },
                            { name: 'Total Price', price: order.totalPrice }
                        ].map(({ name, price }) => (
                            <Row key={name} className="py-1">
                                <Column align="right">{name}: </Column>
                                <Column align="right" width={70} className="align-top">
                                    <Text className="m-0">{FormatCurrency(price)}</Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>
                </Container>
            </Tailwind>
        </Html>
    );
};


